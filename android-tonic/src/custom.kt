@file:JvmName("custom")

package co.socketsupply.android.example
import co.socketsupply.android.example.*

public open class ExampleMainActivity : MainActivity() {
  override protected val TAG = "ExampleAndroidActivity";

  override fun onCreate (state: android.os.Bundle?) {
    super.onCreate(state);

    android.util.Log.d(TAG, this.helloWorld());
  }

  external fun helloWorld (): String;
}
