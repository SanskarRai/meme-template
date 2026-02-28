
Set player = CreateObject("WMPlayer.OCX")
player.URL = WScript.Arguments(0)
player.Controls.play
Do While player.playState <> 1
    WScript.Sleep 100
Loop
        