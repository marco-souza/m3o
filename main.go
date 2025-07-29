package main

import (
	"log"
	"net/http"
	"os"

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
		// serves static files from the provided public dir (if exists)
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

		se.Router.GET("/hello", func(e *core.RequestEvent) error {
			return e.String(http.StatusOK, "Hello world!")
		})

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
