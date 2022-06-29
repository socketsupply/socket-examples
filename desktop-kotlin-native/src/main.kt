import platform.posix.*
import kotlinx.cinterop.*

class IPC {
  fun cwd (): String? {
    return getenv("PWD")?.toKString()
  }

  fun write (command: String, index: Int, query: String? = null) {
    print("ipc://$command?index=$index")

    if (query != null) {
      print("&$query")
    }

    this.flush()
  }

  fun flush () {
    print("\n")
  }

  fun navigate (url: String) {
    this.write("navigate", index = 0, "value=$url")
  }

  fun title (title: String) {
    this.write("title", index = 0, "value=$title")
  }

  fun show (index: Int) {
    this.write("show", index)
  }
}

fun main () {
  val ipc = IPC()
  val cwd = ipc.cwd()

  if (cwd != null) {
    ipc.navigate("file://$cwd/index.html")
    ipc.title("Socket SDK Kotlin/Native %26 Kotlin.js Example")
    ipc.show(index = 0)
  }
}
