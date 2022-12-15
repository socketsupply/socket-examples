#include "android/internal.hh"

extern "C" {
  jstring external(ExampleMainActivity, helloWorld)(
    JNIEnv *env,
    jobject self
  ){
    return env->NewStringUTF("hello world");
  }
}
