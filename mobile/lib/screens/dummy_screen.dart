import 'package:flutter/material.dart';


import '../apis/authentication/login.dart';
import '../apis/user/user.dart';

class DummyScreen extends StatelessWidget {
  const DummyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
                child: Text('press'),
                onPressed: () async {
                  await authenticate();
                }),
            ElevatedButton(
              onPressed: () {
   
              },
              child: const Text('Get my details'),
            )
          ],
        ),
      ),
    );
  }
}
