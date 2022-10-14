# Social-Media-JS
Final version of fakebook javascript CA 

## Required Features
The following user stories are required for a passing submission:
<ul>
<li> User with @noroff.no or @stud.noroff.no email can register profile </li>
<li> Registered user can login </li>
<li> User can view a post content feed </li>
<li> User can filter the post content feed </li>
<li> User can search the post content feed </li>
<li> User can view a post content item by ID </li>
<li> User can create a post content item </li>
<li> User can update a post content item </li>
<li> User can delete a post content item </li>
</ul>

## Additional Features
The following user stories are optional:
<ul>
<li>User can create a comment on a post</li>
<li>User can edit profile media</li>
<li>User can follow/unfollow a profile</li>
<li>User can react to a post content item</li>
</ul>

## Links

<a href='https://fakebook-js2.netlify.app/'>The fakebook </a><br>
<a href='https://github.com/users/gitAji/projects/1'>Pjoject Paln </a><br>
<a href='https://www.figma.com/file/aLWg8mpf2iGhbZLkcPAdMq/Social-media-CA?node-id=0%3A1'>Wireframe </a><br>

## Problems & fixes
Problem: <br>
Currently, a Post can be deleted or edited on the apost.html using post id.
This is not possible on the home.html because the bottons does not hold the post ID.
User should be able to Like & comment on the post on home.html rather than view the post and then react to post.

Solution:<br>Edit,Delete,Like,comment
These events can be trigered using post ID & every single btn should be unique.
