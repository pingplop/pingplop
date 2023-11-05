package cli

import (
	"fmt"

	"github.com/pingplop/pingplop/meta"
	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print Pingplop version information",
	Run: func(cmd *cobra.Command, _ []string) {
		fshort, _ := cmd.Flags().GetBool("short")
		if fshort {
			fmt.Print(meta.Version)
		} else {
			fmt.Printf("Pingplop version: %s %s BuildDate: %s\n",
				meta.Version,
				meta.Platform,
				meta.BuildDate,
			)
		}
	},
}

func init() {
	versionCmd.Flags().BoolP("short", "s", false, "Print just the version number")
	rootCmd.AddCommand(versionCmd)
}
