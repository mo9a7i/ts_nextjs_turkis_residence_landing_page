interface SEOPreviewProps {
  title: string
  description: string
  url: string
}

export function SEOPreview({ title, description, url }: SEOPreviewProps) {
  return (
    <div className="space-y-4 border rounded-lg p-4">
      <h3 className="text-lg font-semibold">SEO Preview</h3>
      <div className="space-y-2">
        <div className="text-blue-600 text-xl hover:underline cursor-pointer">
          {title}
        </div>
        <div className="text-green-600 text-sm">
          {url}
        </div>
        <div className="text-sm text-gray-600">
          {description}
        </div>
      </div>
    </div>
  )
} 