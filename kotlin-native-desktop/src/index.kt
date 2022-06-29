import kotlin.browser.* // from node_modules/kotlin

fun main () {
  val message = "Hello from Kotlin!";
  val heading = document.getElementById("heading");

  console.log(message);
  heading?.textContent = message;
}
