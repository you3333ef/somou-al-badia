'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getTents,
  getFeaturedTents,
  getTentBySlug,
  getTentById,
} from '@/lib/supabase/queries';
import type { TentFilters } from '@/types/tent';

export function useTents(filters?: TentFilters) {
  return useQuery({
    queryKey: ['tents', filters],
    queryFn: () => getTents(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useFeaturedTents() {
  return useQuery({
    queryKey: ['tents', 'featured'],
    queryFn: getFeaturedTents,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useTentBySlug(slug: string) {
  return useQuery({
    queryKey: ['tent', 'slug', slug],
    queryFn: () => getTentBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTentById(id: string) {
  return useQuery({
    queryKey: ['tent', 'id', id],
    queryFn: () => getTentById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
