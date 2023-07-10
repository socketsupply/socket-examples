#include <socket/extension.h>
#include <iostream>

void onProcSpawn (
  sapi_context_t* context,
  sapi_ipc_message_t* message,
  const sapi_ipc_router_t* router
) {
  sapi_ipc_result_t* result = sapi_ipc_result_create(context, message);
  sapi_context_t* processContext = sapi_context_create(context, true);
  sapi_ipc_result_t* processResult = sapi_ipc_result_clone(processContext, result);
  sapi_context_set_data(processContext, processResult);

  auto command = sapi_ipc_message_get(message, "command");

  sapi_process_spawn_stdout_callback_t cb = [](auto process, auto output, auto size) {
    auto context = sapi_process_spawn_get_context(process);
    auto result = (sapi_ipc_result_t*) sapi_context_get_data(context);
    sapi_ipc_send_bytes_with_result(context, result, size, (unsigned char*)output, nullptr);
  };
  sapi_process_spawn(processContext, command, "", "", cb, cb, nullptr);

  sapi_ipc_reply(result);
}

bool initialize (sapi_context_t* context, const void *data) {
  if (sapi_extension_is_allowed(context, "ipc,ipc_router,ipc_router_map")) {
    sapi_ipc_router_map(context, "socket-extension-terminal.process.spawn", onProcSpawn, data);
  }
  return true;
}

bool deinitialize (sapi_context_t* context, const void *data) {
  return true;
}

SOCKET_RUNTIME_REGISTER_EXTENSION(
  "socket-extension-terminal", // name
  initialize, // initializer
  deinitialize, // deinitializer
  "Socket Terminal app (extensions example)", // description
  "0.1.0" // version
);
