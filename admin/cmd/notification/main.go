package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/robfig/cron/v3"
)

func main() {
	c := cron.New()
	c.AddFunc("@every 2s", func() { fmt.Println("Every hour on the half hour") })
	c.Start()
	awaitShutdown(c)
}
func awaitShutdown(c *cron.Cron) {
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop
	log.Println("Stopping...")
	c.Stop()
}
