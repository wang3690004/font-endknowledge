###记录下git相关遇到的问题

1.本地域账号的密码更换导致本地项目因为密码错误无法操作项目。
进入控制面板》用户账号》凭据管理器？windows凭据》普通凭据，在里面找到git，点开编辑密码，更新为最新密码之后就可以正常操作了。

2.git cherry-pick 可以理解为 '挑拣'提交， 他会获取到某一个分支的单笔提交，并作为一个新的提交引入到你当前的分支上。当我们需要再本地合入其他分支提交时 不想对整个分支进行合并 而只是将某一次提交合并到本地当前分支上，那么就可以使用cherry-pick

背景：有个维护了很久的项目，项目版本迭代过程中分出来很多个版本，并且不同版本均有客户在使用。与此同时各个版本都有私有化功能，将一些'中性'的业务。后面的版本要将'中性'的业务整合到最新的版本中。这样在新版本开发过程中自然要使用cherry-pick 将老版本的私有化功能代码合并到新的版本中来

```
用法: git cherry-pick [options] [commit-id]
options: --n  不自动提交 
         --e  编辑提交信息
```

3.
> git branch -a 查看本地和远程所有分支，在一些场景下其他人创建了新的分支，而我本地下无法及时获取到的情况。 需要拉一下所有的分支。
  git branch -m <oldbranch> <newbranch>  重命名本地分支
  git fetch origin  拉取远端所有分支提交  

4. 工作流:
  工作区: 自己当前分支所修改的代码，git add xxx之前， 不包括 git add xxx 和  git commit xxx  之后的
  暂存区: 已经git add xxx进去 而未git commit xxx  的 
  本地分支: 已经git commit -m xxx 提交到本地分支了 
  git push : 已经推送到远程分支上了.

  git commit到本地分支 但是没有git push到远程 这种情况遇见的会相对多一点，毕竟在工作区和暂存区 vscode就可以处理了。
  
  > git log # 获取最近提交的哪一个commit id 
    git reset --hard commit-id  回到你想要的那个版本
    或者 
    git reset --hard HEAD^  回到最新的一次提交
    或者 
    git reset HEAD^ 即使用其默认属性 --mixed 用于重置暂存区的文件与上一次提交的commit保持一致 共过去文件内容保持不变

> git push把修改提交到远程仓库 即真版本回退 
>  1. 通过 git revert 用一次新得commit 来回滚之前得commit 
>  git revert<commit-id>  撤销指定得版本 撤销也会作为一次提交进行保存

> 2. git log 获取要回退得commit id   
>  git reset --hard commit-id
>  git push origin HEAD --force   强制提交一次 之前错误的提交从远程仓库删除

git revert 和 git reset 区别
git revert 是用一次新得commit 来回滚之前得commit 此次提交之前得commit都会被保留
git reset 是回到某次提交 提交及之前得commit 都会被保留， 但是此commit id 之后得修改都会被删除