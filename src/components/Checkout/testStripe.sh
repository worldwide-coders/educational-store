#!bin/bash

curl https://api.stripe.com/v1/payment_intents \
  -u sk_test_51HKrXNIl5ZwwSntzCIXl4TxhITfi9mVKy667SMgEvyF1nFPkAmC1hg7LZfEMP1js6X761ciRVhJpZRy4yvEoREbm00ZDefjN7T: \
  -d amount=1000 \
  -d currency=usd \
  -d "payment_method_types[]"=card \
  -d receipt_email="jenny.rosen@example.com"