import 'package:flutter/material.dart';

import 'package:test1/apis/login.dart';
import 'package:test1/apis/user.dart';

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
                getUser();
              },
              child: const Text('Get my details'),
            )
          ],
        ),
      ),
    );
  }
}
