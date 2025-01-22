import { PropertiesList } from "@/components/properties/properties-list"
import { CreatePropertyButton } from "@/components/properties/create-property-button"

export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>
        <CreatePropertyButton />
      </div>
      <PropertiesList />
    </div>
  )
} 