import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatBytes, getMimeType } from "@/lib/files";
import { Document } from "@/lib/types";

export const ExpertDocuments = ({ documents }: { documents: Document[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {documents.map((doc: Document) => (
        <Card key={doc.id}>
          <CardHeader>
            <h6 className="font-semibold text-2xl line-clamp-1">
              {doc.original_filename}
            </h6>
            <Badge className="bg-[#00ad82]">{doc.ocr_status}</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{getMimeType(doc.mime_type)}</Badge>
              <Badge variant="outline">{formatBytes(doc.size_bytes)}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
