'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useTents } from '@/lib/hooks/useTents';
import { TentGrid } from '@/components/tents/TentGrid';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { TentFilters, TentCategory } from '@/types/tent';

const CATEGORY_LABELS: Record<TentCategory, string> = {
  royal: 'ملكي',
  luxury: 'فاخر',
  premium: 'مميز',
  standard: 'قياسي'
};

export default function CatalogPage() {
  const [filters, setFilters] = useState<TentFilters>({
    category: [],
    minPrice: undefined,
    maxPrice: undefined,
    minCapacity: undefined,
    search: '',
    availableOnly: true,
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data: tents, isLoading } = useTents(filters);

  const categories: TentCategory[] = ['royal', 'luxury', 'premium', 'standard'];

  const toggleCategory = (category: TentCategory) => {
    setFilters((prev) => {
      const current = prev.category || [];
      const updated = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category];
      return { ...prev, category: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      minPrice: undefined,
      maxPrice: undefined,
      minCapacity: undefined,
      search: '',
      availableOnly: true,
    });
  };

  const hasActiveFilters =
    (filters.category && filters.category.length > 0) ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minCapacity ||
    filters.search;

  return (
    <div className="min-h-screen py-8" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-desert-900 mb-4">
            خيامنا
          </h1>
          <p className="text-xl text-desert-600">
            تصفح مجموعتنا من أماكن الإقامة الصحراوية الفاخرة
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="ابحث عن الخيام..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="w-5 h-5 ml-2" />
            فلاتر
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block lg:col-span-1`}
          >
            <Card className="p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-desert-900">الفلاتر</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    مسح
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-desert-900 mb-3">
                    الفئة
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.category?.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-primary-600 border-desert-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-desert-700">
                          {CATEGORY_LABELS[category]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-desert-900 mb-3">
                    نطاق السعر (درهم/ليلة)
                  </h3>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder="الحد الأدنى"
                      value={filters.minPrice || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          minPrice: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        }))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="الحد الأقصى"
                      value={filters.maxPrice || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxPrice: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-desert-900 mb-3">
                    السعة
                  </h3>
                  <Input
                    type="number"
                    placeholder="الحد الأدنى للضيوف"
                    value={filters.minCapacity || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minCapacity: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.availableOnly}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          availableOnly: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-primary-600 border-desert-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-desert-700">المتاحة فقط</span>
                  </label>
                </div>
              </div>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden animate-pulse"
                  >
                    <div className="aspect-[4/3] bg-desert-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-desert-200 rounded" />
                      <div className="h-4 bg-desert-200 rounded w-2/3" />
                      <div className="h-8 bg-desert-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="mb-6 text-desert-600">
                  تم العثور على {tents?.length || 0} خيمة
                </div>
                <TentGrid tents={tents || []} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
