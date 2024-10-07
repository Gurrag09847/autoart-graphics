import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="absolute top-0 left-0 w-full h-16 border-b flex items-center">
            <div className="w-full container mx-auto flex justify-between items-center">
                <a href="/">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        AutoArt Graphics
                    </h4>
                    {/* <h4 className="scroll-m-20 text-xl font-semibold tracking-tight block sm:hidden">
                        AAG
                    </h4> */}
                </a>

            </div>
        </nav>
    )
}