<div align="center">
   <img src="https://github.com/Lightning-AI/lightning-collaborative/blob/main/images/header.png?raw=true" width="100%">
   <div align="center">
      Collaboratively train a model with friends/colleagues or using cloud compute.
   </div>
</div>

## Installation

```
lightning launch app lightning/collaborate
```


## Development

```
git clone https://github.com/Lightning-AI/lightning-collaborative.git
cd lightning-collaborative
pip install -r requirements.txt
pip install -e .

lightning run app app.py
```

Requires npm/node & yarn to be installed to create the build. We'll eventually ship the build once it's ready.

When working on the UI, the build will need to be re-built everytime you change something.

```
npm i --legacy-peer-deps
yarn build

# alternative
# starts a running browser that is updated everytime a change is made
yarn run dev
```

You can also start the app in terminal only mode:

```
TERMINAL_MODE=1 lightning run app app.py
```

You can skip the environment checks via an environment variable:

```
SKIP_ENV_CHECK=1 lightning run app app.py
```

## Troubleshooting

The app is far from perfect and there are some kinks to iron out. Below are helpful tips when using the app.

#### The UI isn't working

Please make sure you're using Google Chrome. Currently Firefox isn't supported.

#### I see a lot of random errors and exceptions in the logs

We're still early stages in making collaborative training stable, and a lot has to do with figuring out the right parameters with the Hivemind team.

#### The UI keeps freezing and logs remain static

Typically a refresh of the browser resolves this issue.

#### Why does my training keep loading peers?

This usually is because the internet bandwidth isn't strong enough to download updates in time. We're investigating solutions to reduce the bandwidth requirements.

### Where is the model saved?

Locally, this is saved under `lightning_logs/` as a ckpt file. In the cloud we're working on making it available under the artifacts tab.

### How do I change the code through the app?

Currently this isn't supported, and you'll need to adjust the `train.py` manually as see fit.

### Other Known issues

- The internet check isn't real all the time. Sometimes it disconnects for no reason.
- A very small model is training. This is primarily due to RAM restrictions.
