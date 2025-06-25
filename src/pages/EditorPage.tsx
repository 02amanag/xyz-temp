// DOCUART BİLGİ TEKNOLOJİLERİ tarafından geliştirilmiştir.
// Bu sayfada, 'variant' prop'unu kullanarak veya doğrudan 'modules' geçerek
// Editor bileşeninin farklı Quill konfigürasyonlarını sergiliyoruz.

import { useState } from "react";
import { Label, Card, CardContent, CardHeader, CardTitle, Editor } from "xyz-comp";

/**
 * Özel (custom) modüller örneği.
 */
const customModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }], // Renk seçiciler
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

function EditorPage() {
  // Her varyasyon için ayrı bir state yönetimi
  const [basicContent, setBasicContent] = useState("");
  const [standardContent, setStandardContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [customContent, setCustomContent] = useState("");

  return (
    <div className="grid grid-cols-2 gap-3">

      {/* Basic Editor */}
      <Card >
        <CardHeader>
          <CardTitle>Basic Editor variant="basic"</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Editor
            variant="basic"
            value={basicContent}
            onChange={(content) => setBasicContent(content)}
            placeholder="Basic editor - içerik giriniz... a"
          />
        </CardContent>
      </Card>

      {/* Standard Editor */}
      <Card >
        <CardHeader>
          <CardTitle>Standard Editor variant="standard"</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Editor
            variant="standard"
            value={standardContent}
            onChange={(content) => setStandardContent(content)}
            placeholder="Standard editor - içerik giriniz..."
          />
        </CardContent>
      </Card>

      {/* Full Editor */}
      <Card >
        <CardHeader>
          <CardTitle>Full Editor variant="full"</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Editor
            variant="full"
            value={fullContent}
            onChange={(content) => setFullContent(content)}
            placeholder="Full editor - içerik giriniz..."
          />
        </CardContent>
      </Card>

      {/* Custom Editor */}
      <Card >
        <CardHeader>
          <CardTitle>Custom Editor (modules prop'u ile özel konfigürasyon)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Editor
            variant="custom"
            value={customContent}
            onChange={(content) => setCustomContent(content)}
            modules={customModules} // Özel toolbar modüllerini direkt gönderiyoruz
            placeholder="Custom editor - içerik giriniz..."
          />
        </CardContent>
      </Card>
    </div >
  );
}

export default EditorPage;
