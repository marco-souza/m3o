package server

import (
	"fmt"
	"net/http"
	"os"

	"github.com/marco-souza/m3o/ui"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func DefineRoutes(se *core.ServeEvent) error {
	// exact path
	se.Router.GET("/{$}", func(e *core.RequestEvent) error {
		title := "Welcome to m3o project"
		description := "This is a sample PocketBase application using Tailwind CSS, Daisy UI, Datastar and go templ."
		content := ui.HomeLayout(title, description, ui.HomeHero())

		return content.Render(e.Request.Context(), e.Response)
	})

	se.Router.GET("/static/{path...}", apis.Static(os.DirFS("./pb_public"), false))

	// set 404 page
	se.Router.Any("/{path...}", func(e *core.RequestEvent) error {
		title := "Page not found"
		path := e.Get("path")
		description := fmt.Sprintf("The requested path '%s' does not exist.", path)

		content := ui.HomeLayout(
			title,
			description,
			ui.ErrorPage(http.StatusNotFound, "Page not found"),
		)

		return content.Render(e.Request.Context(), e.Response)
	})

	return se.Next()
}
