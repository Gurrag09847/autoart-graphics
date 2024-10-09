import { redirect } from "next/navigation";
import { auth } from "~/auth"
import Providers from "~/components/Provider"

const Layout = async ({ children } : { children: React.ReactNode }) => {

    const session = await auth();

    if (!session) return redirect("/login")
    if (session.user.role === "user") return redirect("/login") 

  return (
    <Providers>
        {children}
    </Providers>
  )
}

export default Layout