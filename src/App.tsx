import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { CategoryPage } from "@presentation/pages/CategoryPage";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { ProductPage } from "@presentation/pages/ProductPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import { CartPage } from "@presentation/pages/CartPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";

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
        {isAdmin && <Route path={AppRoute.Categories} element={<CategoryPage />} />}
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {/* {isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />} */}
      </Routes>
    </AppIntlProvider>
}
