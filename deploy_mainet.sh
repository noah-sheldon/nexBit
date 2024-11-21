#!/bin/bash
export BITCOIN_NODE="ic:bitcoin-mainnet"
dfx ping ic
dfx deploy nexBit_frontend --network ic --argument '(variant { mainnet })'