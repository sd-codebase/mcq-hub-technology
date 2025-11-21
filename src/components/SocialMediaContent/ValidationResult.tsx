interface ValidationResultProps {
  isValid: boolean;
  errors?: string[];
  missingFields?: string[];
}

export default function ValidationResult({
  errors = [],
  missingFields = [],
}: ValidationResultProps) {
  return (
    <div className="space-y-3">
      {errors.length > 0 && (
        <div className="p-4 rounded-lg bg-red-50 border-l-4 border-red-500">
          <p className="text-red-700 font-semibold mb-2">Validation Errors:</p>
          <ul className="space-y-1">
            {errors.map((error, idx) => (
              <li key={idx} className="text-red-600 text-sm flex items-start gap-2">
                <span>•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {missingFields.length > 0 && (
        <div className="p-4 rounded-lg bg-amber-50 border-l-4 border-amber-500">
          <p className="text-amber-700 font-semibold mb-2">Missing/Invalid Fields:</p>
          <ul className="space-y-1">
            {missingFields.map((field, idx) => (
              <li key={idx} className="text-amber-600 text-sm flex items-start gap-2">
                <span>•</span>
                <code className="bg-amber-100 px-2 py-1 rounded text-xs">{field}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
