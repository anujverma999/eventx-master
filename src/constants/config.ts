export const ReceiverTypes = {
  _web_hook: "Web Hook",
  _web_api: "Web API",
  _rtsp: "Stream RTSP",
  _web_pull: "Web Pull",
  _hls: "HLS",
  _srt: "SRT",
};

export const ProcessorTypes = {
  _relay: "Relay",
  _router: "Router",
};

export const SenderTypes = {
  _web_push: "Web Push",
  _hls_gen: "Hls Generator",
  _srt_gen: "Srt Generator",
};

export const typeMap: Record<MinionType, Record<string, string>> = {
  receiver: ReceiverTypes,
  processor: ProcessorTypes,
  sender: SenderTypes,
};

export type MinionType = "receiver" | "processor" | "sender";

export type ReceiverSubType = keyof typeof ReceiverTypes;
export type ProcessorSubType = keyof typeof ProcessorTypes;
export type SenderSubType = keyof typeof SenderTypes;

export type SubType = ReceiverSubType | ProcessorSubType | SenderSubType;