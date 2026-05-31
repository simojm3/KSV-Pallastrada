import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(2000),
});

export const equipeSchema = z.object({
  nom: z.string().min(1).max(100),
  abreviation: z.string().max(4).toUpperCase().nullable().optional(),
  logo: z.string().url().nullable().optional(),
  groupeId: z.string().nullable().optional(),
});

export const matchCreateSchema = z.object({
  equipeDomicileId: z.string(),
  equipeExterieId: z.string(),
  heure: z.string().nullable().optional(),
  terrain: z.string().max(100).nullable().optional(),
  phase: z.enum(['GROUPES', 'DEMI_FINALE', 'TROISIEME_PLACE', 'FINALE']),
  ordre: z.number().int().nullable().optional(),
});

export const matchUpdateSchema = z.object({
  scoreDomicile: z.number().int().min(0).nullable().optional(),
  scoreExterieur: z.number().int().min(0).nullable().optional(),
  statut: z.enum(['A_VENIR', 'EN_COURS', 'TERMINE']).optional(),
  equipeDomicileId: z.string().optional(),
  equipeExterieId: z.string().optional(),
  heure: z.string().nullable().optional(),
  terrain: z.string().nullable().optional(),
  phase: z.enum(['GROUPES', 'DEMI_FINALE', 'TROISIEME_PLACE', 'FINALE']).optional(),
});
