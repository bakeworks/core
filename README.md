# BakeWorks

2022-04-02: move from Quasar V1 to Quasar V2

BakeWorks app prototype

## Github SSH

For private repos...

Google: `github multiple ssh keys`

## Generate ssh keys

`> ssh-keygen -t rsa -C mail@bake.works`

- store in bakeworks_rsa
- ok to say no to passhprase, but we did: Baking-247
- generates
  - private key: `~./ssh/bakeworks_rsa`
  - public key: `~./ssh/bakeworks_rsa.pub`

## Edit `~/.ssh config`

Add this entry to ssh config file:

> \#github bakeworks account
> Host bakeworks.github.com
> HostName github.com
> AddKeysToAgent yes
> UseKeychain yes
> User git
> IdentityFile ~/.ssh/bakeworks_rsa

## Add public key to github account settings

- `https://github.com/settings/keys`
- NEW SSH key: copy contents of `~./ssh/bakeworks_rsa.pub`

### If git not working at command line or in yarn

- start ssh agent: `> eval "$(ssh-agent -s)"`
- list active ssh: `> ssh-add -l`
- if bakeworks not listed: `> ssh-add ~/.ssh/bakeworks_rsa`
- verify it's aded: `> ssh-add -l`
passphrase: Baking-247

### .git/config contents
```
[user]
	name = bakeworks
	email = mail@bake.works
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
	ignorecase = true
	sshCommand = ssh -i ~/.ssh/bakeworks_rsa
[remote "origin"]
	url = git@github.com:bakeworks/[repo-name].git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

See

- `https://coderwall.com/p/7smjkq/multiple-ssh-keys-for-different-accounts-on-github-or-gitlab`
- `https://www.section.io/engineering-education/using-multiple-ssh-keys-for-multiple-github-accounts/`
- `https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent`


### Common JS

When we figure out how to package ES6 we will...

### Github

However, requires fiddling around with SSL on Mac, etc to allow for both balmoral and bakeworks to access their different accounts.

Some links which explain how to do this:
* [Handling Multiple Github Accounts on MacOS](https://gist.github.com/Jonalogy/54091c98946cfe4f8cdab2bea79430f9)

`.git/config`

```
[user]
        name = b___w___s
        email = mail@b___.w___s
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        sshCommand = ssh -i ~/.ssh/bakeworks
[remote "origin"]
        url = git@github.com:bakeworks/core.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
```
