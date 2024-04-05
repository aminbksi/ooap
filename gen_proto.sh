#!/bin/sh

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./src/generated"

# protoc \
#     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#     --js_out="import_style=commonjs,binary:${OUT_DIR}" \
#     --ts_out="${OUT_DIR}" \
#     --grpc_out="${OUT_DIR}" \
#     player.proto
protoc \
     --ts_out="${OUT_DIR}" \
    --js_out=import_style=commonjs,binary:"${OUT_DIR}" \
    --grpc_out=grpc_js:"${OUT_DIR}" \
    --plugin=protoc-gen-grpc=node_modules/grpc-tools/bin/grpc_node_plugin \
     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    player.proto
