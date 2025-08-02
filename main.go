package main

import (
	"log"

	"github.com/marco-souza/m3o/internal/server"
	"github.com/pocketbase/pocketbase"
	"github.com/spf13/cobra"
)

func main() {
	app := pocketbase.New()

	// prints "Hello!" every 2 minutes
	app.Cron().MustAdd("hello", "*/2 * * * *", func() {
		log.Println("Hello from cron!")
	})

	app.OnServe().BindFunc(server.DefineRoutes)

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
