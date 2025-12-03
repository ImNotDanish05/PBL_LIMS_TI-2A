import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope, Settings, TestTube, User } from "lucide-react";

export default function OrderSummary({ order, selectedSample }) {
  return (
      <Card className="border border-slate-200 shadow-xl bg-white">
          <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-xl font-bold text-primary-hijauTua flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-hijauTua flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                  </div>
                  Ringkasan Order
              </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <TestTube className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{order.samples.length}</p>
                      <p className="text-sm text-slate-500 mt-1">Total Sample</p>
                  </div>

                  <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-3">
                          <Microscope className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{order.analyses_methods.length}</p>
                      <p className="text-sm text-slate-500 mt-1">Metode Analisis</p>
                  </div>

                  <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-3">
                          <User className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{order.analysts.length}</p>
                      <p className="text-sm text-slate-500 mt-1">Analis Terlibat</p>
                  </div>

                  <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-3">
                          <Settings className="w-8 h-8 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-slate-900">
                          {selectedSample ? selectedSample.n_parameter_methods.equipments.length : 0}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">Peralatan Digunakan</p>
                  </div>
              </div>
          </CardContent>
      </Card>
  )
}
