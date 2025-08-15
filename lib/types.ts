export interface IError {
  status: number;
  message: string;
}

export interface Document {
  id: number;
  original_filename: string;
  size_bytes: number;
  mime_type: string;
  upload_date: string;
  ocr_status: string;
}

export interface Expert {
  id: number;
  name: string;
  role: string;
  instructions: string;
  base_documents: Document[];
  chats: Chat[];
}

export interface Chat {
  id: number;
  title: string;
  created_at: string;
  expert: Expert;
  context_documents: Document[];
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: number;
  question: string;
  answer: string;
  answer_type: string;
  answer_file_path: string;
  created_at: string;
}

export interface SourceResult {
  description: string;
  href: string;
}

export interface CredentialsResponse {
  upload_url: string;
  object_key: string;
  document_id: number;
}

export interface MediaURLResponse {
  presigned_url: string;
}
