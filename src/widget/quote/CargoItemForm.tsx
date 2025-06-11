import { CreateQuoteRequest, UpdateQuoteRequest } from "@/entities/quote";
import { FormInput, FormSelect } from "@/shared/components";
import { Button, Checkbox, Input, Textarea } from "@/shared/ui";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect, useMemo } from "react";
import { useGetCargoPackage } from "@/features/cargo";

const CargoItemForm = ({
  cargoItem,
  index,
  formData,
  setFormData,
}: {
  cargoItem: any;
  index: number;
  formData: UpdateQuoteRequest | CreateQuoteRequest;
  setFormData: React.Dispatch<
    React.SetStateAction<UpdateQuoteRequest | CreateQuoteRequest>
  >;
}) => {
  const { data: cargoPackages = [] } = useGetCargoPackage();

  const canRemove = useMemo(() => formData.cargo.length > 1, [formData.cargo]);

  const updateCargo = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      cargo: prev.cargo.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeCargo = (index: number) => {
    if (formData.cargo.length > 1) {
      setFormData((prev) => ({
        ...prev,
        cargo: prev.cargo.filter((_, i) => i !== index),
      }));
    }
  };

  const packageOptions = [
    { value: "none", label: "Select Package Type" },
    ...cargoPackages.map((pkg) => ({
      value: `${pkg.id}`,
      label: pkg.name,
    })),
    { value: "manual", label: "Enter Dimensions Manually" },
  ];

  const handlePackageChange = (value: string) => {
    console.log(value);
    if (value === "manual" || value === "none") {
      updateCargo(index, "width", 0);
      updateCargo(index, "height", 0);
      updateCargo(index, "length", 0);
    } else {
      const packageId = value;
      const selectedPackage = cargoPackages.find(
        (pkg) => pkg.id === parseInt(packageId)
      );
      updateCargo(index, "width", selectedPackage?.width || 0);
      updateCargo(index, "height", selectedPackage?.height || 0);
      updateCargo(index, "length", selectedPackage?.length || 0);
    }
  };

  return (
    <div className="border border-slate-200 rounded-lg p-6 bg-gray-50/30">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-md font-semibold text-slate-800">
          Package {index + 1}
        </h4>
        {canRemove && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeCargo(index)}
          >
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormSelect
          label="Package Type"
          options={packageOptions}
          onChange={handlePackageChange}
        />
        <FormInput
          label="Weight (lbs)"
          type="number"
          placeholder="e.g., 1200"
          value={cargoItem.weight}
          onChange={(e) =>
            updateCargo(index, "weight", parseFloat(e.target.value) || 0)
          }
          required
        />
        <FormInput
          label="Quantity"
          type="number"
          placeholder="e.g., 2"
          value={cargoItem.quantity}
          onChange={(e) =>
            updateCargo(index, "quantity", parseInt(e.target.value) || 1)
          }
          required
        />
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-1 block">
            Length (inches)
          </Label>
          <Input
            type="number"
            placeholder="Length"
            value={cargoItem.length}
            onChange={(e) =>
              updateCargo(index, "length", parseInt(e.target.value) || 0)
            }
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-1 block">
            Width (inches)
          </Label>
          <Input
            type="number"
            placeholder="Width"
            value={cargoItem.width}
            onChange={(e) =>
              updateCargo(index, "width", parseInt(e.target.value) || 0)
            }
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-slate-700 mb-1 block">
            Height (inches)
          </Label>
          <Input
            type="number"
            placeholder="Height"
            value={cargoItem.height}
            onChange={(e) =>
              updateCargo(index, "height", parseInt(e.target.value) || 0)
            }
          />
        </div>
        <FormInput
          label="Temperature Requirements"
          placeholder="e.g., Keep frozen, Room temperature"
          value={cargoItem.cargo_temperature}
          onChange={(e) =>
            updateCargo(index, "cargo_temperature", e.target.value)
          }
        />
      </div>
      <div className="mt-6">
        <Label className="text-sm font-medium text-slate-700 mb-1 block">
          Package Description
        </Label>
        <Textarea
          placeholder="e.g., Electronics, Furniture"
          value={cargoItem.package_description}
          onChange={(e) =>
            updateCargo(index, "package_description", e.target.value)
          }
        />
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`stackable-${index}`}
              checked={cargoItem.cargo_stackable}
              onCheckedChange={(checked) =>
                updateCargo(index, "cargo_stackable", checked)
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Label
              htmlFor={`stackable-${index}`}
              className="text-sm text-slate-700"
            >
              Stackable
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`hazardous-${index}`}
              checked={cargoItem.is_hazardous}
              onCheckedChange={(checked) =>
                updateCargo(index, "is_hazardous", checked)
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Label
              htmlFor={`hazardous-${index}`}
              className="text-sm text-slate-700"
            >
              Hazardous Material
            </Label>
          </div>
        </div>

        {cargoItem.is_hazardous && (
          <FormInput
            label="Hazardous Material Details"
            placeholder="Describe the hazardous material"
            value={cargoItem.hazardous_detail}
            onChange={(e) =>
              updateCargo(index, "hazardous_detail", e.target.value)
            }
            required
          />
        )}
      </div>
    </div>
  );
};

export default CargoItemForm;
