#!/bin/bash
export BITCOIN_NODE="127.0.0.1:18444"
dfx deploy basic_bitcoin --network local --argument '(variant { regtest })'