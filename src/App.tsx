import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { CategoryPage } from "@presentation/pages/CategoryPage";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { ProductPage } from "@presentation/pages/ProductPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { CartPage } from "@presentation/pages/CartPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";
import { OrderPage } from "@presentation/pages/OrderPage";
import { FeedbackFormPage } from "@presentation/pages/FeedbackFormPage";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const isPersonnel = useOwnUserHasRole(UserRoleEnum.Personnel);
  const isClient = useOwnUserHasRole(UserRoleEnum.Client);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        {(isClient || isPersonnel) && <Route path={AppRoute.Products} element={<ProductPage />} />}
        {isClient && <Route path={AppRoute.Cart} element={<CartPage />} />}
        {isClient && <Route path={AppRoute.Orders} element={<OrderPage />} />}
        {(isClient || isAdmin) && <Route path={AppRoute.Feedback} element={<FeedbackFormPage />} />}
        {isAdmin && <Route path={AppRoute.Categories} element={<CategoryPage />} />}
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />}
      </Routes>
    </AppIntlProvider>
}
