// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Button,
} from "xyz-comp";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-none border-none">
        <CardHeader className="flex flex-col items-center gap-4 pt-10">
          <AlertTriangle className="h-16 w-16 text-destructive" />
          <CardTitle className="text-5xl tracking-tight">404</CardTitle>
          <CardDescription className="text-center text-base">
            {t("notfound.description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-10 flex flex-col sm:flex-row gap-2 justify-center">
          <Link to="/" className="flex-1 sm:flex-none">
            <Button size="lg" className="w-full">
              {t("notfound.home")}
            </Button>
          </Link>

          <Link to="#" className="flex-1 sm:flex-none">
            <Button size="lg" className="w-full">
              {t("notfound.contact")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
