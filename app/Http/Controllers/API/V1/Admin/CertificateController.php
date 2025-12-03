<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Exception;

class CertificateController extends Controller
{
    /**
     * Menampilkan semua sertifikat
     */
    public function index()
    {
        try {
            $certificates = Certificate::with('analyst')->get();

            return response()->json($certificates);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat mengambil data.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menambahkan sertifikat baru
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'analyst_id'  => 'required|exists:analysts,id',
                'name'        => 'required|string|max:255',
                'issued_date' => 'required|date',
                'expired_date' => 'nullable|date|after_or_equal:issued_date',
                'file_path'   => 'nullable|file|mimes:pdf,jpg,png',
            ]);

            // Upload file jika ada
            if ($request->hasFile('file_path')) {
                $file = $request->file('file_path');
                $validated['file_path'] = $file->store('certificates', 'public');
            }

            $certificate = Certificate::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Sertifikat berhasil dibuat.',
                'data'    => $certificate,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat sertifikat.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Memperbarui sertifikat
     */
    public function update(Request $request, $id)
    {
        try {
            $certificate = Certificate::findOrFail($id);

            $validated = $request->validate([
                'analyst_id'  => 'sometimes|exists:analysts,id',
                'name'        => 'sometimes|string|max:255',
                'issued_date' => 'sometimes|date',
                'expired_date' => 'sometimes|date|after_or_equal:issued_date',
                'file_path'   => 'sometimes|file|mimes:pdf,jpg,png',
            ]);

            // Upload file baru jika ada, hapus file lama
            if ($request->hasFile('file_path')) {
                if ($certificate->file_path && Storage::disk('public')->exists($certificate->file_path)) {
                    Storage::disk('public')->delete($certificate->file_path);
                }
                $file = $request->file('file_path');
                $validated['file_path'] = $file->store('certificates', 'public');
            }

            $certificate->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Sertifikat berhasil diperbarui.',
                'data'    => $certificate,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui sertifikat.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus sertifikat
     */
    public function destroy($id)
    {
        try {
            $certificate = Certificate::findOrFail($id);

            // Hapus file jika ada
            if ($certificate->file_path && Storage::disk('public')->exists($certificate->file_path)) {
                Storage::disk('public')->delete($certificate->file_path);
            }

            $certificate->delete();

            return response()->json([
                'success' => true,
                'message' => 'Sertifikat berhasil dihapus.',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus sertifikat.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}
