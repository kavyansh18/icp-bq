use alloy::{
    hex,
    signers::icp::IcpSigner,
    transports::icp::{RpcApi, RpcService},
};
use hex::FromHexError;
use ic_cdk::api::management_canister::http_request::{HttpResponse, TransformArgs};
use serde_json::Value;

pub fn to_hex(data: &[u8]) -> String {
    format!("0x{}", hex::encode(data))
}

pub fn from_hex(data: &str) -> Result<Vec<u8>, FromHexError> {
    hex::decode(&data[2..])
}

fn get_ecdsa_key_name() -> String {
    #[allow(clippy::option_env_unwrap)]
    let dfx_network = option_env!("DFX_NETWORK").unwrap();
    match dfx_network {
        "local" => "dfx_test_key".to_string(),
        "ic" => "key_1".to_string(),
        _ => panic!("Unsupported network."),
    }
}

pub async fn create_icp_signer() -> IcpSigner {
    let ecdsa_key_name = get_ecdsa_key_name();
    IcpSigner::new(vec![], &ecdsa_key_name, None).await.unwrap()
}

pub fn generate_rpc_service(rpc_url: String) -> RpcService {
    RpcService::Custom(RpcApi {
        url: rpc_url,
        headers: None,
    })
}

pub fn transform_http_request(args: TransformArgs) -> HttpResponse {
    HttpResponse {
        status: args.response.status,
        body: canonicalize_json(&args.response.body).unwrap_or(args.response.body),
        headers: vec![],
    }
}

pub fn canonicalize_json(text: &[u8]) -> Option<Vec<u8>> {
    let json = serde_json::from_slice::<Value>(text).ok()?;
    serde_json::to_vec(&json).ok()
}