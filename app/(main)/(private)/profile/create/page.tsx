export default function CreateProfile() {
  return (
    <div className="">
      <h1>Create Your Profile</h1>
      <p>Welcome to Greender! Let's get started.</p>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" required></textarea>

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}
