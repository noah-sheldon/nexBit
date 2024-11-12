mod bitcoin_api;
mod bitcoin_wallet;
mod ecdsa_api;
mod schnorr_api;

use candid::{CandidType, Deserialize};
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse,
};
use ic_cdk::api::management_canister::bitcoin::{BitcoinNetwork, GetUtxosResponse, MillisatoshiPerByte};
use ic_cdk_macros::{init, update};
use serde::Serialize;
use serde_json::{self, Value};
use std::cell::{Cell, RefCell};

#[derive(CandidType, Deserialize, Serialize, Debug)]
pub struct BlockchainStats {
    blocks: u64,
    transactions: u64,
    outputs: u64,
    circulation: u64,
    blocks_24h: u64,
    transactions_24h: u64,
    difficulty: f64,
    volume_24h: u64,
    mempool_transactions: u64,
    mempool_size: u64,
    mempool_tps: f64,
    mempool_total_fee_usd: f64,
    best_block_height: u64,
    best_block_hash: String,
    best_block_time: String,
    blockchain_size: u64,
    average_transaction_fee_24h: u64,
    inflation_24h: u64,
    median_transaction_fee_24h: u64,
    cdd_24h: f64,
    mempool_outputs: u64,
    nodes: u64,
    hashrate_24h: String,
    inflation_usd_24h: f64,
    average_transaction_fee_usd_24h: f64,
    median_transaction_fee_usd_24h: f64,
    market_price_usd: f64,
    market_price_btc: f64,
    market_price_usd_change_24h_percentage: f64,
    market_cap_usd: f64,
    market_dominance_percentage: f64,
    next_retarget_time_estimate: Option<String>,
    next_difficulty_estimate: Option<f64>,
    suggested_transaction_fee_per_byte_sat: u64,
    hodling_addresses: u64,
}

#[derive(CandidType, Deserialize, Debug)]
pub struct BlockSummary {
    block_height: u64,
    block_hash: String,
    timestamp: String,
    transaction_count: u64,
}

#[derive(CandidType, Deserialize, Debug)]
pub struct TransactionSummary {
    txid: Option<String>,
    time: Option<String>,
    input_total: Option<u64>,
    input_total_usd: Option<f64>,
    output_total: Option<u64>,
    output_total_usd: Option<f64>,
    fee: Option<u64>,
    fee_usd: Option<f64>,
}

#[derive(CandidType, Deserialize, Debug)]
pub struct PricePoint {
    timestamp: String,
    price_usd: f64,
}

thread_local! {
    static NETWORK: Cell<BitcoinNetwork> = Cell::new(BitcoinNetwork::Testnet);
    static DERIVATION_PATH: Vec<Vec<u8>> = vec![];
    static KEY_NAME: RefCell<String> = RefCell::new(String::from(""));
}

#[init]
pub fn init(network: BitcoinNetwork) {
    NETWORK.with(|n| n.set(network));
    KEY_NAME.with(|key_name| {
        key_name.replace(String::from(match network {
            BitcoinNetwork::Regtest => "dfx_test_key",
            BitcoinNetwork::Mainnet | BitcoinNetwork::Testnet => "test_key_1",
        }))
    });
}

#[update]
pub async fn get_balance(address: String) -> u64 {
    let network = NETWORK.with(|n| n.get());
    bitcoin_api::get_balance(network, address).await
}

#[update]
pub async fn get_utxos(address: String) -> GetUtxosResponse {
    let network = NETWORK.with(|n| n.get());
    bitcoin_api::get_utxos(network, address).await
}

pub type Height = u32;
pub type BlockHeader = Vec<u8>;

#[derive(CandidType, Debug, Deserialize, PartialEq, Eq)]
pub struct GetBlockHeadersRequest {
    pub start_height: Height,
    pub end_height: Option<Height>,
    pub network: BitcoinNetwork,
}

#[derive(CandidType, Debug, Deserialize, PartialEq, Eq, Clone)]
pub struct GetBlockHeadersResponse {
    pub tip_height: Height,
    pub block_headers: Vec<BlockHeader>,
}

#[update]
pub async fn get_block_headers(start_height: u32, end_height: Option<u32>) -> GetBlockHeadersResponse {
    let network = NETWORK.with(|n| n.get());
    bitcoin_api::get_block_headers(network, start_height, end_height).await
}

#[update]
pub async fn get_current_fee_percentiles() -> Vec<MillisatoshiPerByte> {
    let network = NETWORK.with(|n| n.get());
    bitcoin_api::get_current_fee_percentiles(network).await
}

#[update]
pub async fn get_p2pkh_address() -> String {
    let derivation_path = DERIVATION_PATH.with(|d| d.clone());
    let key_name = KEY_NAME.with(|kn| kn.borrow().to_string());
    let network = NETWORK.with(|n| n.get());
    bitcoin_wallet::p2pkh::get_address(network, key_name, derivation_path).await
}

#[update]
pub async fn send_from_p2pkh(request: SendRequest) -> String {
    let derivation_path = DERIVATION_PATH.with(|d| d.clone());
    let network = NETWORK.with(|n| n.get());
    let key_name = KEY_NAME.with(|kn| kn.borrow().to_string());
    let tx_id = bitcoin_wallet::p2pkh::send(
        network,
        derivation_path,
        key_name,
        request.destination_address,
        request.amount_in_satoshi,
    )
    .await;

    tx_id.to_string()
}

#[update]
pub async fn get_p2tr_script_spend_address() -> String {
    let mut derivation_path = DERIVATION_PATH.with(|d| d.clone());
    derivation_path.push(b"script_spend".to_vec());
    let key_name = KEY_NAME.with(|kn| kn.borrow().to_string());
    let network = NETWORK.with(|n| n.get());

    bitcoin_wallet::p2tr_script_spend::get_address(network, key_name, derivation_path)
        .await
        .to_string()
}

#[update]
pub async fn send_from_p2tr_script_spend(request: SendRequest) -> String {
    let mut derivation_path = DERIVATION_PATH.with(|d| d.clone());
    derivation_path.push(b"script_spend".to_vec());
    let network = NETWORK.with(|n| n.get());
    let key_name = KEY_NAME.with(|kn| kn.borrow().to_string());
    let tx_id = bitcoin_wallet::p2tr_script_spend::send(
        network,
        derivation_path,
        key_name,
        request.destination_address,
        request.amount_in_satoshi,
    )
    .await;

    tx_id.to_string()
}

#[update]
pub async fn get_p2tr_raw_key_spend_address() -> String {
    let mut derivation_path = DERIVATION_PATH.with(|d| d.clone());
    derivation_path.push(b"key_spend".to_vec());
    let key_name = KEY_NAME.with(|kn| kn.borrow().to_string());
    let network = NETWORK.with(|n| n.get());

    bitcoin_wallet::p2tr_raw_key_spend::get_address(network, key_name, derivation_path)
        .await
        .to_string()
}

#[update]
pub async fn send_from_p2tr_raw_key_spend(request: SendRequest) -> String {
    let mut derivation_path = DERIVATION_PATH.with(|d| d.clone());
    derivation_path.push(b"key_spend".to_vec());
    let network = NETWORK.with(|n| n.get());
    let key_name = KEY_NAME.with(|kn| kn.borrow().to_string());
    let tx_id = bitcoin_wallet::p2tr_raw_key_spend::send(
        network,
        derivation_path,
        key_name,
        request.destination_address,
        request.amount_in_satoshi,
    )
    .await;

    tx_id.to_string()
}

#[derive(candid::CandidType, candid::Deserialize)]
pub struct SendRequest {
    pub destination_address: String,
    pub amount_in_satoshi: u64,
}

#[update]
pub async fn get_blockchain_stats() -> Result<BlockchainStats, String> {
    let url = "https://api.blockchair.com/bitcoin/stats";
    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        headers: vec![HttpHeader {
            name: "User-Agent".to_string(),
            value: "Internet Computer Canister".to_string(),
        }],
        body: None,
        max_response_bytes: Some(1024 * 16),
        transform: None,
    };
    let (response,): (HttpResponse,) = http_request(request, 20_000_000)
        .await
        .map_err(|err| format!("Failed to fetch data: {:?}", err))?;
    let parsed_json: Value = serde_json::from_slice(&response.body)
        .map_err(|err| format!("Failed to parse JSON: {:?}", err))?;
    let stats: BlockchainStats = serde_json::from_value(parsed_json["data"].clone())
        .map_err(|err| format!("Failed to parse data field: {:?}", err))?;
    Ok(stats)
}

#[update]
pub async fn get_latest_blocks() -> Result<Vec<BlockSummary>, String> {
    let url = "https://api.blockchair.com/bitcoin/blocks";
    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        headers: vec![HttpHeader {
            name: "User-Agent".to_string(),
            value: "Internet Computer Canister".to_string(),
        }],
        body: None,
        max_response_bytes: Some(1024 * 16),
        transform: None,
    };
    let (response,): (HttpResponse,) = http_request(request, 20_000_000)
        .await
        .map_err(|err| format!("Failed to fetch recent blocks: {:?}", err))?;
    let parsed_json: Value = serde_json::from_slice(&response.body)
        .map_err(|err| format!("Failed to parse JSON: {:?}", err))?;
    let blocks: Vec<BlockSummary> = serde_json::from_value(parsed_json["data"].clone())
        .map_err(|err| format!("Failed to parse block summaries: {:?}", err))?;
    Ok(blocks)
}

#[update]
pub async fn get_latest_transactions() -> Result<Vec<TransactionSummary>, String> {
    let url = "https://api.blockchair.com/bitcoin/transactions";
    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        headers: vec![HttpHeader {
            name: "User-Agent".to_string(),
            value: "Internet Computer Canister".to_string(),
        }],
        body: None,
        max_response_bytes: Some(1024 * 16),
        transform: None,
    };
    let (response,): (HttpResponse,) = http_request(request, 20_000_000)
        .await
        .map_err(|err| format!("Failed to fetch recent transactions: {:?}", err))?;

    let parsed_json: Value = serde_json::from_slice(&response.body)
        .map_err(|err| format!("Failed to parse JSON: {:?}", err))?;

    let transactions: Vec<TransactionSummary> = parsed_json["data"]
        .as_array()
        .unwrap_or(&vec![])
        .iter()
        .map(|tx| TransactionSummary {
            txid: tx["hash"].as_str().map(|s| s.to_string()),
            time: tx["time"].as_str().map(|s| s.to_string()),
            input_total: tx["input_total"].as_u64(),
            input_total_usd: tx["input_total_usd"].as_f64(),
            output_total: tx["output_total"].as_u64(),
            output_total_usd: tx["output_total_usd"].as_f64(),
            fee: tx["fee"].as_u64(),
            fee_usd: tx["fee_usd"].as_f64(),
        })
        .collect();

    Ok(transactions)
}

#[update]
pub async fn get_latest_price() -> Result<PricePoint, String> {
    let url = "https://api.blockchair.com/bitcoin/stats";
    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        headers: vec![HttpHeader {
            name: "User-Agent".to_string(),
            value: "Internet Computer Canister".to_string(),
        }],
        body: None,
        max_response_bytes: Some(1024 * 16),
        transform: None,
    };
    let (response,): (HttpResponse,) = http_request(request, 20_000_000)
        .await
        .map_err(|err| format!("Failed to fetch Bitcoin price: {:?}", err))?;
    
    let parsed_json: Value = serde_json::from_slice(&response.body)
        .map_err(|err| format!("Failed to parse JSON: {:?}", err))?;
    
    let price_point = PricePoint {
        timestamp: parsed_json["data"]["time"].as_str().unwrap_or("").to_string(),
        price_usd: parsed_json["data"]["market_price_usd"]
            .as_f64()
            .unwrap_or(0.0),
    };
    
    Ok(price_point)
}
