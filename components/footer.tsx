import { Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-green-900 border-t-4 border-green-400 py-12 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-400/50"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-2 font-heading">Kaihan (Rosie) Xu</h3>
            <p className="text-sm text-green-200">Information Science (minor in CS & STAT) @UIUC</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-600 hover:text-white futuristic-button"
              asChild
            >
              <a href="https://github.com/RosieXu" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-600 hover:text-white futuristic-button"
              asChild
            >
              <a href="https://www.linkedin.com/in/kaihan-xu-b19516250/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p className="text-sm text-green-200">© 2025 Kaihan (Rosie) Xu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
