interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

export default function JSONEditor({
  value,
  onChange,
  isLoading,
}: JSONEditorProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-gray-700">
          Paste Your JSON
        </label>
        <button
          onClick={handlePaste}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Paste from clipboard"
        >
          📋 Paste from Clipboard
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
        className={`w-full h-96 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none transition-all focus:outline-none focus:border-indigo-500 ${
          isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        }`}
        placeholder={`Paste your JSON with this structure:
{
  "thumbnail_text": ["string", "string"],
  "hooks": ["string", "string"],
  "instagram_reel_caption": "string",
  "facebook_reel_caption": "string",
  "youtube_shorts": {
    "title": "string",
    "description": "string",
    "hashtags": ["string"]
  },
  "linkedin_caption": "string",
  "whatsapp_channel_post": "string",
  "cta_pack": ["string"]
}`}
      />
    </div>
  );
}
