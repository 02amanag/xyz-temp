/* LoginPage.tsx */
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/auth/useAuthContext";
import { Input, Button, useToast, Card, Checkbox, Label, SidebarProvider, Separator } from "xyz-comp";
import { Link } from "react-router";
import { ThemeCustomizer } from "@/components/theme/theme-customizer";

// 1) Zod şeması tanımlama
const loginSchema = z.object({
  emailUsername: z.string().min(1, "Email veya kullanıcı adı zorunludur."),
  password: z.string().min(1, "Şifre zorunludur."),
});

// Şemadan form tipi türetiyoruz. afterSubmit opsiyonel alan
type FormValues = z.infer<typeof loginSchema> & {
  afterSubmit?: string;
};

export default function LoginPage() {
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 2) React Hook Form ayarları
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailUsername: "",
      password: "",
    },
  });

  // 3) Form gönderildiğinde
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await login(data.emailUsername, data.password);
      // Başarılı giriş durumunda AuthContext genelde yönlendirme yapar
    } catch (error: any) {
      // Hata durumunda
      reset();
      const errorMessage = error?.message || "Login error";
      setError("afterSubmit", { type: "manual", message: errorMessage });
      toast({
        title: "Login Error",
        description: "errorMessage",
        action: (
          <div className="flex items-center gap-3">
            <Button>Kapat</Button>
            <Button>Gerial</Button>
          </div>
        )
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider className="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 800"
        className="fixed left-0 top-0 min-h-screen min-w-screen"
        preserveAspectRatio="none">
        <rect fill="#3b82f6" width="1600" height="800"></rect>
        <path fill="#60a5fa" d="M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z"></path>
        <path fill="#93c5fd" d="M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z"></path>
        <path fill="#bfdbfe" d="M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z"></path>
        <path fill="#dbeafe" d="M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z"></path>
      </svg>

      <div className="w-full max-w-lg min-h-screen flex items-center justify-center z-10 md:px-0 px-5">
        <Card className="w-full p-10">
          <h1 className="text-xl font-bold mb-2">Login</h1>
          <h1 className="text-sm text-muted-foreground mb-4">Lütfen gerekli bilgileri giriniz.</h1>

          {/* Eğer afterSubmit hatası varsa düz bir <div> gösteriyoruz */}
          {errors.afterSubmit && (
            <div className="mb-2 text-red-500">{errors.afterSubmit.message}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="w-full">
              <Input placeholder="Email veya Kullanıcı Adı" className="w-full border p-2 rounded" {...register("emailUsername")} label="Kullanıcı Adı" />
              {errors.emailUsername && (<div className="text-red-500 mt-1"> {errors.emailUsername.message} </div>)}
            </div>

            <div className="w-full">
              <Input placeholder="Şifre" className="w-full border p-2 rounded" type={"password"} {...register("password")} label="Şifre" />
              {errors.password && (<div className="text-red-500 mt-1">{errors.password.message}</div>)}
            </div>

            <div className="w-full flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox className="!rounded-md" />
                <Label>Beni Hatırla</Label>
              </div>
              <Link to={"#"} className="text-xs underline">Parola değiştir</Link>
            </div>

            <Button type="submit" className="w-full block" disabled={loading} >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>

            <Separator  />
            <Link to={"/register"}  className="mt-1 block">
              <Button className="w-full block" disabled={loading} variant={"ghost"}>
                {"Kayıt ol"}
              </Button>
            </Link>

          </form>
        </Card>
      </div>

      <div className="fixed right-0 top-1/2 bg-primary text-primary-foreground rounded-tl-lg rounded-bl-lg z-20">
        <ThemeCustomizer />
      </div>
    </SidebarProvider >
  );
}
