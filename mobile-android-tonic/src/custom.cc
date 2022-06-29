#include "android.hh"

extern "C" {
  jstring exports(custom, helloWorld)(
    JNIEnv *env,
    jobject self
  ){
    return env->NewStringUTF("hello world");
  }
}
