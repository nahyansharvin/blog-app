import { Button } from "Components/ui/button"
import { Card, CardContent } from "Components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "Components/ui/pagination"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 md:px-8 lg:px-12 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="text-xl font-bold">
            Blogg
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:underline">
              Home
            </a>
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Categories
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 py-8 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(12)].map((_, index) => (
            <Card key={index} className="shadow-md">
              <img
                src="/placeholder.svg"
                alt={`Blog Post ${index + 1}`}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">Blog Post {index + 1}</h2>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacus, nisl
                  nec ultricies lacus, nisl nec ultricies lacus.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-primary hover:text-primary-foreground"
                >
                  Read More
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="container mx-auto mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-4 px-6 md:px-8 lg:px-12 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Blog Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
