package main

import (
	"log"
	"os"

	"github.com/marco-souza/m3o/ui"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/spf13/cobra"
)

func main() {
	app := pocketbase.New()

	// prints "Hello!" every 2 minutes
	app.Cron().MustAdd("hello", "*/2 * * * *", func() {
		log.Println("Hello from cron!")
	})

	// add a /hello endpoint that returns "Hello world!"
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/", func(e *core.RequestEvent) error {
			component := ui.HomeLayout("World from server")
			return component.Render(e.Request.Context(), e.Response)
		})

		se.Router.GET("/static/{path...}", apis.Static(os.DirFS("./pb_public"), false))

		return se.Next()
	})

	// add a CLI command that prints "Hello world!"
	app.RootCmd.AddCommand(&cobra.Command{
		Use: "hello",
		Run: func(cmd *cobra.Command, args []string) {
			print("Hello from CLI")
		},
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
