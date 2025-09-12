import { Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-primary mb-2">Kaihan (Rosie) Xu</h3>
            <p className="text-sm text-muted-foreground">Information Science (minor in CS & STAT) @UIUC</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground" asChild>
              <a href="https://github.com/RosieXu" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground" asChild>
              <a href="https://www.linkedin.com/in/kaihan-xu-b19516250/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">© 2025 Kaihan (Rosie) Xu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
