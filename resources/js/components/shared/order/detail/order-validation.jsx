import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function OrderValidation({ handleValidation }) {
  return (
      <Card className="shadow-xl border-2 border-primary-hijauMuda bg-primary-hijauTerang">
          <CardContent className="p-6">
              <div className="flex items-center justify-between">
                  <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Validasi Order</h3>
                      <p className="text-sm text-slate-600">
                          Review semua informasi dan lakukan validasi order
                      </p>
                  </div>
                  <div className="flex gap-3">
                      <Button onClick={handleValidation} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-6">
                          <Check className="w-5 h-5" />
                          <span className="font-semibold">Setuju & Validasi</span>
                      </Button>
                      <Button onClick={handleValidation} className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-6">
                          <X className="w-5 h-5" />
                          <span className="font-semibold">Tolak Order</span>
                      </Button>
                  </div>
              </div>
          </CardContent>
      </Card>
  )
}
