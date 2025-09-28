import { IFile } from '@/models/file.model';
import z from 'zod';
import { formatBytes } from '@/lib/byte';

export const getFileSchema = z.object({
  fileId: z.string(),
  fileName: z.string(),
  path: z.string(),
  size: z.number(),
  contentType: z.string(),
  uploadedDate: z.date(),
  uploadedByEmployeeName: z.string(),
});

export const editFileSchema = ({ maxSize }: { maxSize?: number } = {}) => {
  return z.union([
    z
      .instanceof(File, {
        message: 'Vui lòng nhập file.',
      })
      .refine((f) => !maxSize || f.size <= maxSize, {
        message: `File tối đa ${formatBytes(maxSize!)}`,
      }),
    z.custom<IFile>(
      (val) => {
        return val !== undefined && val !== null;
      },
      {
        message: 'Vui lòng nhập file.',
      },
    ),
  ]);
};

export const singleFileUploadSchema = z.object({
  file: editFileSchema(),
});

export type GetFileSchemaType = z.infer<typeof getFileSchema>;
export type EditFileSchemaType = z.infer<ReturnType<typeof editFileSchema>>;
export type SingleFileUploadSchemaType = z.infer<typeof singleFileUploadSchema>;
