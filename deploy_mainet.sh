#!/bin/bash
export BITCOIN_NODE="ic:bitcoin-mainnet"
dfx ping ic
dfx deploy basic_bitcoin --network ic --argument '(variant { mainnet })'