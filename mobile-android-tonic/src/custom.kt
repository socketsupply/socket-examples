@file:JvmName("custom")

package co.socketsupply.android.example
import co.socketsupply.android.example.*

public open class ExampleAndroidActivity : WebViewActivity() {
  override protected val TAG = "ExampleAndroidActivity";

  override fun onCreate (state: android.os.Bundle?) {
    super.onCreate(state);

    val core = this.core

    if (core != null) {
      android.util.Log.d(TAG, core.helloWorld());
    }
  }
}

external fun NativeCore.helloWorld(): String;
