'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { hapticImpact } from '@/lib/capacitor/native';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await hapticImpact('medium');
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-desert-900 mb-4">
              تواصل معنا
            </h1>
            <p className="text-xl text-desert-600">
              لديك استفسار؟ يسعدنا التواصل معك
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Phone,
                title: 'الهاتف',
                content: '0505952036',
                link: 'tel:+971505952036',
              },
              {
                icon: Mail,
                title: 'البريد الإلكتروني',
                content: 'info@somoalbadia.ae',
                link: 'mailto:info@somoalbadia.ae',
              },
              {
                icon: MapPin,
                title: 'الموقع',
                content: 'أبو ظبي، الإمارات العربية المتحدة',
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-full mb-4">
                  <item.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-desert-900 mb-2">
                  {item.title}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-primary-600 hover:text-primary-700 text-lg font-medium"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-desert-600">{item.content}</p>
                )}
              </Card>
            ))}
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-desert-900 mb-6">
              أرسل لنا رسالة
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="الاسم"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="اسمك الكامل"
                  required
                />

                <Input
                  type="email"
                  label="البريد الإلكتروني"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="email@example.com"
                  required
                />
              </div>

              <Input
                type="tel"
                label="رقم الهاتف"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="05xxxxxxxx"
                required
              />

              <div>
                <label className="block text-sm font-semibold text-desert-800 mb-2">
                  الرسالة
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder="كيف يمكننا مساعدتك..."
                  rows={6}
                  required
                  className="w-full rounded-lg border-2 border-desert-200 bg-white px-4 py-3 text-base text-desert-900 placeholder:text-desert-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5 ml-2" />
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
